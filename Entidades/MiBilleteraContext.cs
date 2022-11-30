using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entidades
{
    public partial class MiBilleteraContext : DbContext
    {
        public MiBilleteraContext()
        {
        }

        public MiBilleteraContext(DbContextOptions<MiBilleteraContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cuenta> Cuentas { get; set; } = null!;
        public virtual DbSet<Transaccion> Transacciones { get; set; } = null!;
        public virtual DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-30ISOBV\\SQLEXPRESS; Database=MiBilletera; User=sa; Password=MiBilletera; TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cuenta>(entity =>
            {
                entity.HasKey(e => e.IdCuenta);

                entity.Property(e => e.Cbu)
                    .HasMaxLength(50)
                    .HasColumnName("CBU");

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaBaja).HasColumnType("datetime");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Cuenta)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK_Cuentas_Usuarios");
            });

            modelBuilder.Entity<Transaccion>(entity =>
            {
                entity.HasKey(e => e.IdTransacciones);

                entity.Property(e => e.Fecha).HasColumnType("datetime");

                entity.HasOne(d => d.IdCuentaDestinoNavigation);
                    //.WithMany(p => p.TransaccioneIdCuentaDestinoNavigations)
                    //.HasForeignKey(d => d.IdCuentaDestino)
                    //.HasConstraintName("FK_Transacciones_Cuentas1");

                entity.HasOne(d => d.IdCuentaOrigenNavigation)
                    .WithMany(p => p.TransaccioneIdCuentaOrigenNavigations)
                    .HasForeignKey(d => d.IdCuentaOrigen)
                    .HasConstraintName("FK_Transacciones_Cuentas");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.Apellido).HasMaxLength(50);

                entity.Property(e => e.Dni).HasMaxLength(8);

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaBaja).HasColumnType("datetime");

                entity.Property(e => e.FechaNacimiento).HasColumnType("date");

                entity.Property(e => e.Nombre).HasMaxLength(100);

                entity.Property(e => e.Password).HasMaxLength(8);

                entity.Property(e => e.Telefono).HasMaxLength(10);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.Usuario1)
                    .HasMaxLength(10)
                    .HasColumnName("Usuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
