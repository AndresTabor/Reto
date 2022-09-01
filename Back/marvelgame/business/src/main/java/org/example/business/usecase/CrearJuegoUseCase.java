package org.example.business.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.business.gateway.ConsultaCartasMaestrasService;
import org.example.domain.CrearJuegoCommand;
import org.example.domain.Juego;
import org.example.domain.JugadoresFactory;
import org.example.domain.values.JuegoId;
import org.example.domain.values.JugadorId;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.function.Function;

public class CrearJuegoUseCase implements Function<Mono<CrearJuegoCommand>, Flux<DomainEvent>> {

    private final ConsultaCartasMaestrasService service;

    public CrearJuegoUseCase(ConsultaCartasMaestrasService service) {
        this.service = service;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<CrearJuegoCommand> crearJuegoCommand) {
        return crearJuegoCommand.flatMapMany((command) -> {
            var factory = new JugadoresFactory();

            command.getJugadores().forEach((id, alias) ->
                    factory.agregarJugador(JugadorId.of(id), alias, generarMazo())
            );
            var juego = new Juego(JuegoId.of(command.getJuegoId()), factory);
            return Flux.fromIterable(juego.getUncommittedChanges());
        });
    }
}
