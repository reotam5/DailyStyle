﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Data.Migrations
{
    [DbContext(typeof(DailyStyleDBContext))]
    partial class DailyStyleDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.2");

            modelBuilder.Entity("backend.Models.Clothing", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("Image")
                        .HasColumnType("BLOB");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Clothings");
                });

            modelBuilder.Entity("backend.Models.ClothingTag", b =>
                {
                    b.Property<int>("ClothingId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TagId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ClothingId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("ClothingTags");
                });

            modelBuilder.Entity("backend.Models.Tag", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("backend.Models.ClothingTag", b =>
                {
                    b.HasOne("backend.Models.Clothing", "Clothing")
                        .WithMany("ClothingTags")
                        .HasForeignKey("ClothingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Tag", "Tag")
                        .WithMany("ClothingTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Clothing");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("backend.Models.Clothing", b =>
                {
                    b.Navigation("ClothingTags");
                });

            modelBuilder.Entity("backend.Models.Tag", b =>
                {
                    b.Navigation("ClothingTags");
                });
#pragma warning restore 612, 618
        }
    }
}
