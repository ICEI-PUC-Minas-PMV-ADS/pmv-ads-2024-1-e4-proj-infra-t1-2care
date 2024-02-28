CREATE TABLE IF NOT EXISTS "User" (
    id UUID PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    picture TEXT,
    address TEXT NOT NULL,
    post_code VARCHAR(15) NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL,
    user_type INT NOT NULL,
    gender INT NOT NULL,
    preferred_contact INT NOT NULL,
    birth_date DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS SpecialCare (
    id UUID PRIMARY KEY,
    name INT NOT NULL
);

CREATE TABLE IF NOT EXISTS SpecialCareUser (
    id UUID PRIMARY KEY,
    care_type UUID REFERENCES SpecialCare(id),
    description TEXT
);

CREATE TABLE IF NOT EXISTS CareReceiver (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES "User"(id),
    emegence_contact VARCHAR(64) NOT NULL,
    share_special_care BOOLEAN DEFAULT TRUE,
    additional_info TEXT
);

CREATE TABLE IF NOT EXISTS Qualification (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS WorkExperience (
    id UUID PRIMARY KEY,
    place VARCHAR(128) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Specialization (
    id UUID PRIMARY KEY,
    name INT NOT NULL
);

CREATE TABLE IF NOT EXISTS FixedUnavailableDay (
    id UUID PRIMARY KEY,
    day INT NOT NULL CHECK (day >= 0 AND day <= 6)
);

CREATE TABLE IF NOT EXISTS FixedUnavailableHour (
    id UUID PRIMARY KEY,
    hour INT NOT NULL CHECK (hour >= 0 AND hour <= 23)
);

CREATE TABLE IF NOT EXISTS CustomUnavailableDay (
    id UUID PRIMARY KEY,
    date_unavailable DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Caregiver (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES "User"(id),
    hour_price DECIMAL(6,2) NOT NULL,
    day_price DECIMAL(6,2) NOT NULL,
    max_request_km SMALLINT,
    work_exp_years SMALLINT NOT NULL DEFAULT 0,
    additional_info TEXT,
    FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE IF NOT EXISTS Caregiver_Qualification (
    caregiver_id UUID,
    qualification_id UUID,
    PRIMARY KEY (caregiver_id, qualification_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(id),
    FOREIGN KEY (qualification_id) REFERENCES Qualification(id)
);

CREATE TABLE IF NOT EXISTS Caregiver_WorkExperience (
    caregiver_id UUID,
    work_experience_id UUID,
    PRIMARY KEY (caregiver_id, work_experience_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(id),
    FOREIGN KEY (work_experience_id) REFERENCES WorkExperience(id)
);

CREATE TABLE IF NOT EXISTS Caregiver_Specialization (
    caregiver_id UUID,
    specialization_id UUID,
    PRIMARY KEY (caregiver_id, specialization_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(id),
    FOREIGN KEY (specialization_id) REFERENCES Specialization(id)
);

CREATE TABLE IF NOT EXISTS Caregiver_FixedUnavailableDay (
    caregiver_id UUID,
    fixed_forbidden_day_id UUID,
    PRIMARY KEY (caregiver_id, fixed_forbidden_day_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(id),
    FOREIGN KEY (fixed_forbidden_day_id) REFERENCES FixedUnavailableDay(id)
);

CREATE TABLE IF NOT EXISTS Caregiver_FixedUnavailableHour (
    caregiver_id UUID,
    fixed_forbidden_hour_id UUID,
    PRIMARY KEY (caregiver_id, fixed_forbidden_hour_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(id),
    FOREIGN KEY (fixed_forbidden_hour_id) REFERENCES FixedUnavailableHour(id)
);

CREATE TABLE IF NOT EXISTS Caregiver_CustomUnavailableDay (
    caregiver_id UUID,
    custom_forbidden_day_id UUID,
    PRIMARY KEY (caregiver_id, custom_forbidden_day_id),
    FOREIGN KEY (caregiver_id) REFERENCES Caregiver(id),
    FOREIGN KEY (custom_forbidden_day_id) REFERENCES CustomUnavailableDay(id)
);

CREATE TABLE IF NOT EXISTS Evaluation (
    id UUID PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    description TEXT,
    caregiver_id UUID REFERENCES Caregiver(id),
    care_receiver_id UUID REFERENCES CareReceiver(id)
);

CREATE TABLE IF NOT EXISTS CareRequest (
    id UUID PRIMARY KEY,
    caregiver_id UUID REFERENCES Caregiver(id),
    care_receiver_id UUID REFERENCES CareReceiver(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_hours SMALLINT NOT NULL,
    final_price DECIMAL(6,2) NOT NULL,
    status INT NOT NULL CHECK (status >= 0 AND status <= 2)
);