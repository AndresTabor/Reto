package org.example.domain.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.domain.values.Estado;

public class JuegoCreado extends DomainEvent {
    private final Estado estado;

    public JuegoCreado(Estado estado) {
        super("marvelgame.juegocreado");
        this.estado = estado;
    }

    public Estado getEstado() {
        return estado;
    }
}
