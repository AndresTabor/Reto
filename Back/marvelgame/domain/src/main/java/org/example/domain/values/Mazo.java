package org.example.domain.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.Set;

public class Mazo implements ValueObject<Set<Carta>> {
    private final Set<Carta> mazo;

    public Mazo(Set<Carta> mazo) {
        this.mazo = mazo;
    }

    @Override
    public Set<Carta> value() {
        return mazo;
    }
}
