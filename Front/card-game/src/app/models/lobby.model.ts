import { PlayerLobby } from 'src/app/models/playerLobby';
export interface Lobby {
    id: string;
    name: string;
    players: Array<PlayerLobby>;
}