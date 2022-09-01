function CadUsuario({eventoTeclado, cadastrar, objeto}) {
    return(
        <div>
            <form>
                <div>
                    <label>Nome:</label>
                    <input required onChange={eventoTeclado} value={objeto.nome} name="nome" type="text"/>
                </div>
                <div>
                    <label>NIF:</label>
                    <input required onChange={eventoTeclado} value={objeto.nif} name="nif" type="text"/>
                </div>
                <div>
                    <label>Email:</label>
                    <input required onChange={eventoTeclado} value={objeto.email} name="email" type="text"/>
                </div>
                <div>
                    <label>Senha:</label>
                    <input required onChange={eventoTeclado} value={objeto.senha} name="senha" type="text"/>
                </div>

                <input type="button" value="Cadastrar" onClick={cadastrar}/>
            </form>
        </div>
    )
}

export default CadUsuario