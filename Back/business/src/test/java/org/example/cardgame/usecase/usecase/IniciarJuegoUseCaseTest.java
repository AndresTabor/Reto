package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.command.IniciarJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IniciarJuegoUseCaseTest {

    @Mock
    private JuegoDomainEventRepository service;

    @InjectMocks
    private IniciarJuegoUseCase useCase;

    @Test
    void iniciarJuegoHappyPass(){
        var juegoId = JuegoId.of("Juego-001");
        var comando = new IniciarJuegoCommand(juegoId.value());

        when(service.obtenerEventosPor(juegoId.value())).thenReturn(obtenerEventos());

        StepVerifier.create(useCase.apply(Mono.just(comando)))
                .expectNextMatches(eventoDominio->{
                    var evento = (TableroCreado) eventoDominio;
                    return "Juego-001".equals(evento.aggregateRootId());
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> obtenerEventos() {

        return Flux.just(
                new JuegoCreado(JugadorId.of("JugadorPrincipalId-001"))
        );
    }

}