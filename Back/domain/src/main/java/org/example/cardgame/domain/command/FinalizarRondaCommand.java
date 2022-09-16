package org.example.cardgame.domain.command;

import co.com.sofka.domain.generic.Command;

import java.util.Set;

public class FinalizarRondaCommand extends Command {
    private String juegoId;

    private Set<String> jugadoresSeleccionados;

    public Set<String> getJugadoresSeleccionados() {
        return jugadoresSeleccionados;
    }

    public void setJugadoresSeleccionados(Set<String> jugadoresSeleccionados) {
        this.jugadoresSeleccionados = jugadoresSeleccionados;
    }

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}
