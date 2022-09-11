package org.example.cardgame.domain.command;

import co.com.sofka.domain.generic.Command;

/**
 * The type Iniciar ronda command.
 */
public class IniciarRondaCommand extends Command {
    private String juegoId;


    public String getJuegoId() {
        return juegoId;
    }

    public IniciarRondaCommand() {
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}
