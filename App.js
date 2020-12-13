import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// TODO: Сделать редактирование пациентов и приемов.
// TODO: Сделать popup для приема в карте пациента (удаление, редактирование).
// TODO: Сделать экран "формулу зубов" и как-то показывать там снимки.
// TODO: Сделать обновление в карте пациента после доавления приёма(Переделать PatientScreen.).

import {
    HomeScreen,
    PatientScreen,
    AddPatientScreen,
    AddAppointmentScreen,
    PatientsScreen
} from './screens';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Patient: {
            screen: PatientScreen
        },
        AddPatient: {
            screen: AddPatientScreen
        },
        AddAppointment: {
            screen: AddAppointmentScreen
        },
        Patients: {
            screen: PatientsScreen
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);
