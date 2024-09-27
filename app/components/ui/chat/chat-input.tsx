import { Button } from "../button";
import { Input } from "../input";
import { ChatHandler } from "./chat.interface";

export default function ChatInput(
  props: Pick<
    ChatHandler,
    "isLoading" | "handleSubmit" | "handleInputChange" | "input"
  >,
) {
  return (
    <form
      onSubmit={props.handleSubmit}
      className="flex w-full items-start justify-between gap-4 rounded-xl bg-white p-4 shadow-xl"
    >
      <Input
        autoFocus
        name="message"
        placeholder="Tapez votre message"
        className="flex-1"
        value={props.input}
        onChange={props.handleInputChange}
      />
      <Button className="bg-black text-white font-bold" type="submit" disabled={props.isLoading} variant="ghost" >
        Envoyer
      </Button>
    </form>
  );
}
