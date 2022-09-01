package org.example.domain.events;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.domain.values.JugadorId;

public class JugadorAdicionado extends DomainEvent {
    private final JugadorId identity;
    private final String alias;

    public JugadorAdicionado(JugadorId identity, String alias) {
        super("marvelgame.jugadoradicionado");
        this.identity = identity;
        this.alias = alias;
    }

    public String getAlias() {
        return alias;
    }

    public JugadorId getIdentity() {
        return identity;
    }
}
