package com.digitazon.poscoffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.digitazon.poscoffee.models.Settings;

public interface SettingsRepository extends JpaRepository<Settings, Long> {}
