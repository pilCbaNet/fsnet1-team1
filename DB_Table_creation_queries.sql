create table Usuarios(
IdUsuario int identity primary key,
Nombre nvarchar(20),
Apellido nvarchar(20),
Usuario nvarchar(20),
Password nvarchar(30),
Dni varchar(10),
FechaNacimiento date,
FechaAlta datetime,
FechaBaja datetime,
Telefono varchar(10),
Email nvarchar(50)
)

create table Cuentas(
IdCuenta int identity primary key,
CBU nvarchar(20),
Saldo money,
FechaAlta datetime,
FechaBaja datetime,
IdUsuario int,
constraint fk_Cuentas_Usuarios foreign key (IdUsuario) references Usuarios(IdUsuario)
)

create table Transacciones(
IdTransacciones int identity primary key,
Monto money,
Fecha datetime,
TipoTransaccion int,
IdCuentaOrigen int,
IdCuentaDestino int,
constraint fk_Transacciones_Cuentas foreign key (IdCuentaOrigen) references Cuentas(IdCuenta),
constraint fk_Transacciones_Cuentas1 foreign key (IdCuentaDestino) references Cuentas(IdCuenta)
)

create table Depositos(
IdDepositos int identity primary key,
IdCuenta int,
Fecha datetime,
Monto money,
constraint fk_cuenta_deposito foreign key (IdCuenta)
								references Cuentas(IdCuenta)
)