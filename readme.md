# Clinica Backend

Repositorio destinado a construcão de um backend de um sistema de clínica médica utilizando node js.
Repositorio com fins educacionais 

## Instalacão

Utiilze o yarn para instalar as dependencias.
Crie um banco de dados de nome clinica
Rode as migracoes yarn sequelize db:migrate

# Rotas
```bash
/users
CREATE
POST -> body{
    name (required)
    cpf (required)
    access_level (A , B or C)
    password (min 6 caracters)(required)
}

/users
UPDATE
PUT -> body{
    name 
    login 
    access_level (A , B or C)
    oldPassword (min 6 caracters)(required if password)
    password (min 6 caracters)(required)
}

/users
List
get 
}
```

```bash
yarn install
```
 
## Licenca
[MIT](https://choosealicense.com/licenses/mit/)