package org.example.cardgame.domain.command;

import co.com.sofka.domain.generic.Command;


public class PonerCartaEnTablero extends Command {
    private String jugadorId;
    private String cartaId;
    private String juegoId;

    public PonerCartaEnTablero(String jugadorId, String cartaId, String juegoId) {
        this.jugadorId = jugadorId;
        this.cartaId = cartaId;
        this.juegoId = juegoId;
    }

    public PonerCartaEnTablero() {
    }

    public String getJugadorId() {
        return jugadorId;
    }


    public void setJugadorId(String jugadorId) {
        this.jugadorId = jugadorId;
    }


    public String getCartaId() {
        return cartaId;
    }


    public void setCartaId(String cartaId) {
        this.cartaId = cartaId;
    }


    public String getJuegoId() {
        return juegoId;
    }


    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}
