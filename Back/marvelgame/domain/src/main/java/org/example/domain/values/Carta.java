package org.example.domain.values;

import co.com.sofka.domain.generic.ValueObject;

import java.util.Objects;

public class Carta implements ValueObject<Carta.Props> {
    private final Integer poder;
    private final String cartaMaestraId;
    private final Boolean estaHabilitada;

    public Carta(Integer poder, String cartaMaestraId, Boolean estaHabilitada) {
        this.poder = Objects.requireNonNull(poder);
        this.cartaMaestraId = Objects.requireNonNull(cartaMaestraId);
        this.estaHabilitada = Objects.requireNonNull(estaHabilitada);

        if(this.poder <= 0){
            throw new IllegalArgumentException("EL PODER DE LA CARTA NO PUEDE SER NEGATIVO O CERO");
        }
    }

    @Override
    public Carta.Props value() {
        return new Props() {
            @Override
            public Integer poder() {
                return poder;
            }

            @Override
            public String cartaMaestraId() {
                return cartaMaestraId;
            }

            @Override
            public Boolean estaHabilitada() {
                return estaHabilitada;
            }
        };
    }

    public interface Props {
         Integer poder();
         String cartaMaestraId();
         Boolean estaHabilitada();
    }
}
