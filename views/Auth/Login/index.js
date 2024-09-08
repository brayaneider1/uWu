import React, { useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { View, Text, Input, Button, Spinner, Alert } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import useAuthStore from '../../../store/useAuthStore'; // Importar el hook de autenticación
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import { getSubscriptionByUser } from '../../../api/subscriptions';
export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });
  const { login, user, subscritionId } = useAuthStore();

  const onSubmit = async (data) => {
    Keyboard.dismiss()
    setIsLoading(true);
    setError(null);

    try {
      await login(data.phone, data.password);
      const subscription = user != null ? await getSubscriptionByUser(user?.sub) : null
      subscritionId(subscription?.subscription_id)
      setIsLoading(false);
      if (subscription?.plan?.plan_id == 1) {
        navigation.navigate('NotificationPlan');
      } else {
        navigation.navigate('Register');
      }

    } catch (err) {
      setIsLoading(false);
      setError({
        show: true,
        message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
      });
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
      secureTextEntry: hidePassword,
      rules: { required: true },
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
      {isLoading && <LoadingOverlay />}

      {error?.show && (
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
