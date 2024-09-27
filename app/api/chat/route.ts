import { Message, StreamingTextResponse } from "ai";
import { OpenAI } from "llamaindex";
import { NextRequest, NextResponse } from "next/server";
import { createChatEngine } from "./engine";
import { LlamaIndexStream } from "./llamaindex-stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages }: { messages: Message[] } = body;

    // Ensure there is at least one message and the last message is from the user
    if (
      !messages ||
      messages.length === 0 ||
      messages[messages.length - 1].role !== "user"
    ) {
      return NextResponse.json(
        {
          error:
            "Messages are required in the request body and the last message must be from the user",
        },
        { status: 400 }
      );
    }

    // Initialize the OpenAI model with specific parameters
    const llm = new OpenAI({
      model: "gpt-3.5-turbo",
      temperature: 0.0,
      topP: 0.9,
      maxTokens: 500,
    });

    const contactTribunal = `
      Par téléphone : 
      - Montréal, Laval et Longueuil : [514 873-2245](tel:5148732245)
      - Autres régions : [1 800 683-2245](tel:18006832245)
        (Laisser une ligne vide)
      Par télécopieur :
      - Montréal, Laval et Longueuil : [514 864-8077](fax:5148648077)
      - Autres régions : [1 877 907-8077](fax:18779078077)
          (Laisser une ligne vide)
      Par courrier :
      Village olympique 
      5199, rue Sherbrooke Est 
      Bureau 2360 
      Montréal (Québec) H1T 3X1

      Évidemment les coordonnées doivent être des hyperliens cliquables en bleu.
      `;
    // Define the initial context for the conversation
    
    const initialContext = `
Le chatbot est un facilitateur des articles de loi concernant le Tribunal administratif du logement du Québec.
Son rôle est d'analyser les questions des utilisateurs en se basant uniquement sur les lois et règlements du TAL
inclus dans le document fourni. Il doit fournir des réponses précises et concises en intégrant les articles de loi
pertinents de manière exacte. Les articles déjà mentionnés ne doivent pas être réécrits à chaque réponse,
mais simplement cités par leur numéro/titre.

Le chatbot doit poser des questions pour clarifier les situations complexes, sans donner de réponse définitive trop rapidement. 

La citation d'un article doit être structurée comme suit :
- Le titre ou numéro de l'article en **gras**, suivi de deux points, puis le texte exact entre guillemets.
La référence complète de l'article doit apparaître en plus petit (comme la date d'entrée en vigueur, numéro d'article, etc.).

Exemple :
- **Article 28 :** "Le Tribunal administratif du logement connaît en première instance, à l’exclusion de tout autre tribunal,
de toute demande [...]". (Réf : 1979, c. 48, a. 28 ; 2023, c. 3, a. 271)

Le chatbot ne doit mentionner les coordonnées du TAL qu'en dernier recours, après avoir tenté plusieurs fois
de comprendre la situation et fourni des options à l'utilisateur. Ces coordonnées ne doivent apparaître
qu'une seule fois par conversation et c'est à la fin. Voici les informations de contact à utiliser : ${contactTribunal}
`;


    // Prepend the initial context to the last user message
    const lastMessage = messages.pop();
    if (lastMessage)
      lastMessage.content = initialContext + "\n\n" + lastMessage?.content;

    // Create the chat engine with the OpenAI model
    const chatEngine = await createChatEngine(llm);

    // Get the response from the chat engine
    const response =
      lastMessage &&
      (await chatEngine.chat(lastMessage.content, messages, true));

    // Transform the response into a readable stream
    const stream = response && LlamaIndexStream(response);
    if (stream)
      // Return a StreamingTextResponse, which can be consumed by the client
      return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
