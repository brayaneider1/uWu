import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, Button, Input, Alert, Icon } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import useAuthStore from '../../../store/useAuthStore'; // Asegúrate de importar tu hook de Zustand aquí
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';

export default function Register({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [error, setError] = useState({ show: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuthStore();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError({ show: false, message: '' });
    if (data.password !== data.password2) {
      setError({ show: true, message: 'Las contraseñas no coinciden' });
      setIsLoading(false);
      return;
    }

    try {
      await register(data.name, data.email, data.phoneNumber, data.password, data.code);
      setIsLoading(false);
      navigation.navigate('Login');
    } catch (err) {
      setIsLoading(false);
      setError({
        show: true,
        message: 'Error al registrarse. Por favor, inténtalo de nuevo',
      });
    }
  };

  const fields = [
    {
      name: 'name',
      placeholder: 'Nombres',
      keyboardType: 'default',
      secureTextEntry: false,
      rules: { required: true },
    },
    {
      name: 'phoneNumber',
      placeholder: 'Número de teléfono',
      keyboardType: 'phone-pad',
      secureTextEntry: false,
      rules: { required: true },
    },
    {
      name: 'code',
      placeholder: 'Código de invitación',
      keyboardType: 'default',
      secureTextEntry: false,
      rules: { required: true },
    },
    {
      name: 'email',
      placeholder: 'Correo electrónico',
      keyboardType: 'email-address',
      secureTextEntry: false,
      rules: { required: true },
    },
    {
      name: 'password',
      placeholder: 'Contraseña',
      keyboardType: 'default',
      secureTextEntry: hidePassword,
      rules: { required: true },
      icon: (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <Icon as={MaterialIcons} name={hidePassword ? 'visibility-off' : 'visibility'} mx={2} size={5} color="white" />
        </TouchableOpacity>
      ),
    },
    {
      name: 'password2',
      placeholder: 'Confirmación de Contraseña',
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
      p='10'
      bg='primaryBg'
      flex={1}
      justifyContent='space-between'
      color='white'
    >
      {error?.show && (
        <Alert status='error' w='100%'>
          <Text>{error.message}</Text>
        </Alert>
      )}
      {isLoading && <LoadingOverlay />}

      <View style={{ alignItems: 'center' }}>
        <Text color='white' fontSize='30' fontWeight='bold'>
          Registro
        </Text>
        <Text color='white' fontSize='18' mt={2}>
          Crea tu cuenta y vive una nueva experiencia.
        </Text>
      </View>

      <View>
        {fields.map((field, index) => (
          <Controller
            key={index}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                my={2}
                px={2}
                color='white'
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
        ))}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text mx='auto' color='white' fontSize='16' mt={2}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        mt={4}
        borderRadius='lg'
        bg='actionBlue'
        onPress={handleSubmit(onSubmit)}
      >
        Registro
      </Button>
    </View>
  );
}