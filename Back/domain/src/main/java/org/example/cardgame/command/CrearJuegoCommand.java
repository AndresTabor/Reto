package org.example.cardgame.command;

import co.com.sofka.domain.generic.Command;

import java.util.HashMap;
import java.util.Map;

public class CrearJuegoCommand extends Command {
    private String juegoId;
    private Map<String, String> jugadores;
    private String jugadorPrincipalId;

    public CrearJuegoCommand(String juegoId, Map<String, String> jugadores, String jugadorPrincipalId) {
        this.jugadores = new HashMap<>();
        this.juegoId = juegoId;
        this.jugadores = jugadores;
        this.jugadorPrincipalId = jugadorPrincipalId;
    }

    public Map<String, String> getJugadores() {
        return jugadores;
    }

    public String getJugadorPrincipalId() {
        return jugadorPrincipalId;
    }

    public String getJuegoId() {
        return juegoId;
    }


}
