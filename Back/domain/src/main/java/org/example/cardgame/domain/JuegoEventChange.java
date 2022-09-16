package org.example.cardgame.domain;

import co.com.sofka.domain.generic.EventChange;
import org.example.cardgame.domain.events.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Objects;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * The type Juego event change.
 */
public class JuegoEventChange extends EventChange {
    /**
     * Instantiates a new Juego event change.
     *
     * @param juego the juego
     */
    public JuegoEventChange(Juego juego) {
        apply((JuegoCreado event) -> {
            juego.jugadores = new HashMap<>();
            juego.jugadorPrincipal = event.getJugadorPrincipal();
        });
        apply((JugadorAgregado event) -> {
            juego.jugadores.put(event.getJuegoId(),
                    new Jugador(event.getJuegoId(), event.getAlias(), event.getMazo())
            );
        });

        apply((RondaCreada event) -> {
            if (Objects.isNull(juego.tablero)) {
                throw new IllegalArgumentException("Debe existir el tablero primero");
            }
            juego.ronda = event.getRonda();
            juego.tablero.ajustarTiempo(event.getTiempo());
        });

        apply((TableroCreado event) -> {
            juego.tablero = new Tablero(event.getTableroId(), event.getJugadorIds());
        });

        apply((TiempoCambiadoDelTablero event) -> {
            juego.tablero.ajustarTiempo(event.getTiempo());
        });

        apply((CartaPuestaEnTablero event) -> {
            juego.tablero.adicionarPartida(event.getJugadorId(), event.getCarta());
            AtomicInteger counter = new AtomicInteger();
            juego.tablero.partida().values().stream().forEach(c -> {
                if(c.size() > 0)  { counter.getAndIncrement(); }
            });
            if(counter.get() == 2){
                var r = new Random();
                var idJugador = juego.tablero.partida().keySet().stream().collect(Collectors.toList()).get(r.nextInt((1 - 0) + 1) + 0);
                juego.selecciocarJuador(idJugador.value());
            }
        });

        apply((CartaQuitadaDelTablero event) -> {
            juego.tablero.quitarCarta(event.getJugadorId(), event.getCarta());
        });

        apply((CartaQuitadaDelMazo event) -> {
            juego.jugadores.get(event.getJugadorId()).quitarCartaDeMazo(event.getCarta());
        });

        apply((RondaIniciada event) -> {
            juego.ronda = juego.ronda.iniciarRonda();
            juego.tablero.habilitarApuesta();
            juego.tablero.partida().forEach((key, value) -> juego.tablero.partida().put(key,new HashSet<>()));
        });

        apply((RondaTerminada event) -> {
            juego.ronda = juego.ronda.terminarRonda();
            juego.tablero.inhabilitarApuesta();

        });

        apply((CartasAsignadasAJugador event) -> {
            var jugador = juego.jugadores().get(event.getGanadorId());
            event.getCartasApuesta().forEach(jugador::agregarCartaAMazo);
        });

        apply((JuegoFinalizado event) -> {
            juego.ganador = juego.jugadores.get(event.getJugadorId());
        });

    }
}
