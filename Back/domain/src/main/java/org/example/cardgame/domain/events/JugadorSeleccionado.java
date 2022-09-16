package org.example.cardgame.domain.events;

import co.com.sofka.domain.generic.DomainEvent;

public class JugadorSeleccionado extends DomainEvent {
    private final String jugadorId;

    public JugadorSeleccionado(String jugadorId) {
        super("cardgame.JugadorSeleccionado");
        this.jugadorId = jugadorId;
    }

    public String getJugadorId() {
        return jugadorId;
    }
}
