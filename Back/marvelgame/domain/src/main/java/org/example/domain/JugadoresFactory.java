package org.example.domain;

import org.example.domain.values.JugadorId;

import java.util.HashSet;
import java.util.Set;

public class JugadoresFactory {
    private final Set<Jugador> jugadores;

    public JugadoresFactory() {
        this.jugadores = new HashSet<>();
    }

    public void agregarJugador(JugadorId id, String alias, Mazo mazo){
       this.jugadores.add(new Jugador(id, alias, mazo)) ;
    }

    protected Set<Jugador> jugadores() {
        return jugadores;
    }
}
