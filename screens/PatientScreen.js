import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Linking, SectionList, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Foundation, Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable-row';

import {
    GrayText,
    Button,
    Badge,
    Container,
    Appointment,
    PlusButton
} from '../components';

import { patientsApi, phoneFormat } from '../utils';

const PatientScreen = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const id = navigation.getParam('patient')._id;
        patientsApi
            .show(id)
            .then(({ data }) => {
                setAppointments(data.data.appointments);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    /*const removeAppointment = id => {
        Alert.alert(
            'Удаление приема',
            'Вы действительно хотите удалить прием?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: () => {
                        setIsLoading(true);
                        appointmentsApi
                            .remove(id)
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    };*/


    return (
        <View style={{ flex: 1 }}>
            <PatientDetails>
                <PatientFullname>
                    {navigation.getParam('patient', {}).fullname}
                </PatientFullname>
                <GrayText>
                    {phoneFormat(navigation.getParam('patient', {}).phone)}
                </GrayText>

                <PatientButtons>
                    <FormulaButtonView>
                        <Button>Формула зубов</Button>
                    </FormulaButtonView>
                    <PhoneButtonView>
                        <Button
                            onPress={() =>
                                Linking.openURL(
                                    'tel:' + navigation.getParam('patient', {}).phone
                                )
                            }
                            color="#84D269"
                        >
                            <Foundation name="telephone" size={22} color="white" />
                        </Button>
                    </PhoneButtonView>
                </PatientButtons>
            </PatientDetails>


            <PatientAppointments>
                <ScrollView>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#2A86FF" />
                    ) : (
                        appointments.map(appointment => (
                            <Swipeable
                                rightButtons={[
                                    <SwipeViewButton style={{ backgroundColor: '#B4C1CB' }}>
                                        <Ionicons name="md-create" size={28} color="white" />
                                    </SwipeViewButton>,
                                    <SwipeViewButton
                                        //onPress={removeAppointment.bind(this, item._id)}
                                        style={{ backgroundColor: '#F85A5A' }}
                                    >
                                        <Ionicons name="ios-close" size={48} color="white" />
                                    </SwipeViewButton>
                                ]}
                            >
                                <AppointmentCard key={appointment._id}>
                                    <AppointmentCardRow>
                                        <Ionicons name="md-medical" size={16} color="#A3A3A3" />
                                        <AppointmentCardLabel>
                                            Зуб:{' '}
                                            <Text style={{ fontWeight: '600' }}>
                                                {appointment.dentNumber}
                                            </Text>
                                        </AppointmentCardLabel>
                                    </AppointmentCardRow>
                                    <AppointmentCardRow>
                                        <Foundation
                                            name="clipboard-notes"
                                            size={16}
                                            color="#A3A3A3"
                                        />
                                        <AppointmentCardLabel>
                                            Диагноз:{' '}
                                            <Text style={{ fontWeight: '600' }}>
                                                {appointment.diagnosis}
                                            </Text>
                                        </AppointmentCardLabel>
                                    </AppointmentCardRow>
                                    <AppointmentCardRow
                                        style={{ marginTop: 15, justifyContent: 'space-between' }}
                                    >
                                        <Badge style={{ width: 155 }} active>
                                            {appointment.date
                                                .split('-')
                                                .reverse()
                                                .join('-')} - {appointment.time}
                                        </Badge>
                                        <Badge color="green">{appointment.price} Р</Badge>
                                    </AppointmentCardRow>
                                </AppointmentCard>
                            </Swipeable>
                        ))
                    )}
                </ScrollView>
            </PatientAppointments>

            <PlusButton
                onPress={navigation.navigate.bind(this, 'AddAppointment', {
                    patientId: navigation.getParam('patient', {})._id
                })}
            />
        </View>
    );
};

const AppointmentCardLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

const AppointmentCard = styled.View`
  shadow-color: gray;
  elevation: 0.5;
  shadow-opacity: 0.4;
  shadow-radius: 10;
  padding: 20px 25px;
  
  background: white;
  margin-bottom: 20px;
`;

const PatientDetails = styled(Container)`
  flex: 0.3;
`;

const PatientAppointments = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const FormulaButtonView = styled.View`
  flex: 1;
`;

const PhoneButtonView = styled.View`
  margin-left: 10px;
  width: 45px;
`;

const PatientButtons = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
`;

const PatientFullname = styled.Text`
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
`;

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 88.2%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

PatientScreen.navigationOptions = {
    title: 'Карта пациента',
    headerTintColor: '#2A86FF',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default PatientScreen;
