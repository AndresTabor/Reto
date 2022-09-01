package org.example.domain.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.Objects;

public class Estado implements ValueObject<Estado.Estados> {
    private final Estados estados;

    public Estado(Estados estados) {
        this.estados = Objects.requireNonNull(estados);
    }

    @Override
    public Estados value() {
        return estados;
    }

    public enum Estados {
        CREADO, INICIADO,TERMINADO
    }
}
