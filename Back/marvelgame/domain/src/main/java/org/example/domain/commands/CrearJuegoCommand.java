package org.example.domain;

import co.com.sofka.domain.generic.Command;

import java.util.Map;

public class CrearJuegoCommand extends Command {
    private final String juegoId;
    private final Map<String, String> jugadores;

    public CrearJuegoCommand(String juegoId, Map<String, String> jugadores) {
        this.juegoId = juegoId;
        this.jugadores = jugadores;
    }

    public Map<String, String> getJugadores() {
        return jugadores;
    }

    public String getJuegoId() {
        return juegoId;
    }
}
