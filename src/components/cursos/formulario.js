import { red } from "@mui/material/colors"



function Formulario({ eventoTeclado, cadastrar }) {


    return (
        <div>

            <form style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>cadastrar cursos</h1>
                <input
                    required
                    name="nome" className="Nome"
                    type="text" placeholder="Nome do curso"
                    onChange={eventoTeclado}
                />
                
                <select  name="area" onChange={eventoTeclado}>
                    <option>
                        
                        
                    </option>
                </select>
                <input
                    required
                    name="objetivo" className="obj_curso"
                    type="text" placeholder="objetivo do curso"
                    onChange={eventoTeclado}

                />
                <input
                    required
                    name="preRequisito" className="req_pré"
                    type="text" placeholder="Pré requisito"
                    onChange={eventoTeclado}
                />
                <input
                    required
                    name="conteudoProgramatico" className="cont_prog"
                    type="text" placeholder="Conteúdo programático"
                    onChange={eventoTeclado}
                />
                <input
                    required
                    name="sigla" className="sigla"
                    type="text" placeholder="Sigla do curso"
                    onChange={eventoTeclado}
                />

                <label>selecione o nivel de atendimento</label>
                <select >
                    <option onChange={eventoTeclado} ></option>
                </select>

                <select>
                    <option>
                        selecione o tipo de atendimento
                    </option>
                </select>
                <input
                    required
                    name="cgho" className="carga_horaria"
                    type="text" placeholder="Carga horaria"
                    onChange={eventoTeclado}
                />
                <input
                    required
                    name="valor" className="valor_cursos"
                    type="text" placeholder="valor"
                    onChange={eventoTeclado}
                />
                <button onClick={cadastrar}>cadastrar</button>

            </form>
        </div>
    )
}
export default Formulario