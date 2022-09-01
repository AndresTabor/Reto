package org.example.domain;

import co.com.sofka.domain.generic.AggregateEvent;
import org.example.domain.values.Estado;
import org.example.domain.events.JuegoCreado;
import org.example.domain.values.JuegoId;
import org.example.domain.events.JugadorAdicionado;
import org.example.domain.values.JugadorId;

import java.util.Map;
import java.util.function.Consumer;

public class Juego extends AggregateEvent<JuegoId> {
    protected Map<JugadorId, Jugador> jugadores;
    protected Tablero tablero;
    protected Jugador ganador;
    protected Estado estado;

    public Juego(JuegoId entityId, JugadoresFactory factory) {
        super(entityId);
        appendChange(new JuegoCreado(new Estado(Estado.Estados.CREADO))).apply();
        factory.jugadores().forEach(jugador -> appendChange(new JugadorAdicionado(
                jugador.identity(),
                jugador.alias()
        )).apply());
        subscribe(new JuegoEventChange(this));
    }

    private Juego(JuegoId entityId){
        super(entityId);
    }
}
