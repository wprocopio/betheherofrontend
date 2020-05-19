import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

   async function handleLogin(e) {
        e.preventDefault();
        try {
           const response = await api.post('sessions', { id } );
           localStorage.setItem('ongId',id);
           localStorage.setItem('ongName',response.data.name);
           history.push('/profile');

        } catch (err) {
            alert('Ong nao existe')
        }
    }

    return (
        <div className="logon-containner">
            <section className="form">
                <img src={logoImg} alt="Logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}

                        placeholder="Informe Sua ID" />
                    <button className="button" type="submit">
                        Entrar
                   </button>
                    <Link classname="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                    Nao tenho cadastro
                </Link>
                </form>
            </section>
            <img src={heroesImg} alt="herose" />
        </div>
    )
}

export default Logon