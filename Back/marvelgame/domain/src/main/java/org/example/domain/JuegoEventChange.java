package org.example.domain;

import co.com.sofka.domain.generic.EventChange;
import org.example.domain.events.JuegoCreado;
import org.example.domain.events.JugadorAdicionado;

import java.util.HashMap;

public class JuegoEventChange extends EventChange {
    public JuegoEventChange(Juego juego) {
        apply((JuegoCreado event) -> {
            juego.estado = event.getEstado();
            juego.jugadores = new HashMap<>();
            juego.tablero = null;
        });

        apply((JugadorAdicionado event) -> {
            juego.jugadores.put(event.getIdentity(),
                    new Jugador(event.getIdentity(), event.getAlias())
            );
        });
    }
}
