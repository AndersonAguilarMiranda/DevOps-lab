package com.dmz2.flexis;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlexiRepository extends JpaRepository<Flexi, Long> {
}
