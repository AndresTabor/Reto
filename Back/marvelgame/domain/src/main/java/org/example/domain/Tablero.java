package org.example.domain;

import co.com.sofka.domain.generic.Entity;
import org.example.domain.values.Carta;
import org.example.domain.values.JugadorId;
import org.example.domain.values.TableroId;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Tablero extends Entity<TableroId> {
    private Map<JugadorId, Carta> cartas;
    private Integer tiempo;
    public Tablero(TableroId entityId, Integer tiempo) {
        super(entityId);
        this.cartas = new HashMap<>();
        this.tiempo = tiempo;
    }

    public void cambiarTiempo(Integer tiempo){
        this.tiempo = tiempo;
    }

    public void ponerCartaEnTablero(JugadorId id, Carta carta){
        this.cartas.put(id, carta);
    }

    public Set<Carta> cartas() {
        return new HashSet<>(cartas.values());
    }


}
