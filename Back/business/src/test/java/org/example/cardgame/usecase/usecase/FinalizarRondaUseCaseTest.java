package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.FinalizarRondaCommand;
import org.example.cardgame.domain.events.*;
import org.example.cardgame.domain.values.*;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FinalizarRondaUseCaseTest {
    @InjectMocks
    private FinalizarRondaUseCase useCase;

    @Mock
    private JuegoDomainEventRepository repository;

    @Test
    void finalizarRondaPass(){
        //arrange
        var command = new FinalizarRondaCommand();
        command.setJuegoId("123");

        when(repository.obtenerEventosPor("123")).thenReturn(eventos());

        StepVerifier.create(useCase.apply(Mono.just(command)))//act
                .expectNextMatches(domainEvent -> {
                    var event = (CartasAsignadasAJugador) domainEvent;
                    return "yyyyy".equals(event.getGanadorId().value());
                })
                .expectNextMatches(domainEvent -> {
                    var event = (RondaTerminada) domainEvent;
                    return "123".equals(event.getTableroId().value());
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> eventos() {
        var jugadorId = JugadorId.of("yyyyy");
        var jugador2Id = JugadorId.of("hhhhhh");
        var carta1 = new Carta(
                CartaMaestraId.of("carta1"),
                20,
                false, true, "img.jpg"
        );
        var carta11 = new Carta(
                CartaMaestraId.of("carta11"),
                40,
                false, true, "img.jpg"
        );
        var carta2 = new Carta(
                CartaMaestraId.of("carta2"),
                15,
                false, true, "img.jpg"
        );
        var carta22 = new Carta(
                CartaMaestraId.of("carta22"),
                10,
                false, true, "img.jpg"
        );
        var cartas = Set.of(carta1);
        var cartas2 = Set.of(carta22);
        var tableroId = new TableroId();
        var ronda = new Ronda(1, Set.of(jugadorId, jugador2Id));
        return Flux.just(
                new JuegoCreado(jugadorId),
                new JugadorAgregado(jugadorId, "raul", new Mazo(cartas)),
                new JugadorAgregado(jugador2Id, "jose", new Mazo(cartas2)),
                new TableroCreado(tableroId, Set.of(jugadorId, jugador2Id)),
                new RondaCreada(ronda, 30),
                new RondaIniciada(),
                new CartaPuestaEnTablero(tableroId, jugadorId, carta1),
               // new CartaPuestaEnTablero(tableroId, jugadorId, carta11),
                //new CartaPuestaEnTablero(tableroId, jugador2Id, carta2),
                new CartaPuestaEnTablero(tableroId, jugador2Id, carta22),
                new JugadorSeleccionado(jugadorId.value())
        );
    }

}