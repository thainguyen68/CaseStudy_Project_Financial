package com.example.demo.service;
import java.util.List;
public interface ICrud<E> {
List<E> findAll(Long userId);
E findOne(Long id);
void save(E e);
void delete(Long id);
}
