package com.students.studentsmarks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.students.studentsmarks.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}