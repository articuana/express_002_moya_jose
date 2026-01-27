# Arquitectura por capas

## controladores
capa que va directamente contra el cliente {cliente no necesariamente es humano}

## servicios
- logica de negocio 
- validaciones
- orquestar operaciones
- lanzar excepciones de negocio 

## repositorios
- acceso a los datos
- operaciones CRUD basicas
- DEBE ser independiente de la lógica del negocio

En esta arquitectura cada capa tiene una resposabilidad

# trabajando con node:
> controladores => routes
> servicios => servicios
> repositorios => repositorios

# Para la sigueinte clase (Martes) tener instalado docker
## Como se si tengo instalado docker
''' bash 
docker -v
'''

## asegurate también de tener docker-compose 
''' bash
docker-compose -v

'''