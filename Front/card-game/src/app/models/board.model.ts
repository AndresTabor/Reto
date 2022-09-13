import { CardBoard } from "./cardsBoards.model";

export interface Board {
    cardsDeck: Map<string, Set<CardBoard>>;
    isEnabled: boolean;
    time: number;
}