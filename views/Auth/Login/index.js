import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { View, Text, Input, Button, Alert, Icon } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import useAuthStore from '../../../store/useAuthStore'; // Importar el hook de autenticación
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';

export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hidePassword2, setHidePassword2] = useState(true);
  const { login, loading, error, subscriptionData, isAuthenticated } = useAuthStore();

  const onSubmit = async (data) => {
    Keyboard.dismiss();
    try {
      await login(data.phone, data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const fields = [
    {
      name: 'phone',
      placeholder: 'Número de teléfono',
      keyboardType: 'phone-pad',
      secureTextEntry: false,
      rules: { required: true },
    },
    {
      name: 'password',
      placeholder: 'Contraseña',
      keyboardType: 'default',
      secureTextEntry: hidePassword2,
      rules: { required: true },
      icon: (
        <TouchableOpacity onPress={() => setHidePassword2(!hidePassword2)}>
          <Icon as={MaterialIcons} name={hidePassword2 ? 'visibility-off' : 'visibility'} mx={2} size={5} color="white" />
        </TouchableOpacity>
      ),
    },
  ];

  return (
    <View
      p={10}
      bg='primaryBg'
      flex={1}
      justifyContent='space-between'
      color='white'
    >
      {loading && <LoadingOverlay />}

      {error && (
        <Alert status='error' w='100%'>
          <Text>{error.message}</Text>
        </Alert>
      )}

      <View style={{ alignItems: 'flex-end' }}>
        <Text fontSize='3xl' fontWeight='bold' color='white'>
          Inicia sesión
        </Text>
        <Text fontSize='md' fontWeight='light' color='white'>
          Bienvenido. ¡Te hemos extrañado!
        </Text>
      </View>

      <View>
        {fields.map((field, index) => (
          <View key={index}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  color='white'
                  my={4}
                  borderRadius='lg'
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder={field.placeholder}
                  keyboardType={field.keyboardType}
                  secureTextEntry={field.secureTextEntry}
                  InputRightElement={field.icon}

                />
              )}
              name={field.name}
              rules={field.rules}
              defaultValue=''
            />
            {errors[field.name] && (
              <Text my={0} color='orange.600'>
                Este campo es requerido.
              </Text>
            )}
          </View>
        ))}

        <Text
          textAlign='center'
          color='gray.300'
          fontSize='md'
          fontWeight='light'
        >
          ¿No tienes cuenta?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text
            textAlign='center'
            color='white'
            fontSize='lg'
            fontWeight='bold'
          >
            Registro
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        borderRadius='lg'
        bg='actionBlue'
        onPress={handleSubmit(onSubmit)}
      >
        Ingresar
      </Button>
    </View>
  );
}