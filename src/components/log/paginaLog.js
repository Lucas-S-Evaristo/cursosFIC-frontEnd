
import "../log/log.css"
import MenuLateralLogs from "../menu/menuLateralLogs"

export default function PaginaLog() {


    return (


        <div className="geralLog">
            <MenuLateralLogs/>

            <h1 className="tituloLog">Visualizar ações:</h1>

            <section className="sec1">

                <div className="divsDoLog">

                    <a href="/logArea">

                        <h4>Área</h4>

                        <img src={require("../../imagens/area.png")}></img>

                        </a>
                </div>

                <div className="divsDoLog">

                    <a href="/logCurso">

                        <h4>Cursos</h4>

                        <img src={require("../../imagens/curso.png")}></img>

                        </a>
                </div>

                <div className="divsDoLog">

                    <a href="/logHorario">

                        <h4>Hora</h4>

                        <img src={require("../../imagens/hora.png")}></img>

                        </a>
                </div>

                <div className="divsDoLog">

                    <a href="/logInstrutor">

                        <h4>Instrutor</h4>

                        <img src={require("../../imagens/instrutor.png")}></img>

                        </a>
                </div>

                <div className="divsDoLog">

                    <a href="/logTurma">

                        <h4>Turma</h4>

                        <img src={require("../../imagens/turma.png")}></img>

                        </a>
                </div>

                <div className="divsDoLog">

                    <a href="/logUsuario">

                        <h4>Usuário</h4>

                        <img src={require("../../imagens/usuario.png")}></img>

                    </a>

                </div>


            </section>


        </div>
    )

}