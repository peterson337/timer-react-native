import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

export const Contador = (props) => {

    var done = false;

        useEffect(() => {
          const timer = setInterval(() => {
                props.setarSegundos(props.segundos - 1)

                if (props.segundos <= 0) {
                    if (props.minutos > 0) {
                        props.setarMinutos(minutos - 1);
                        props.setarSegundos(59)
                    }else{
                        if (!done) {
                            done = true;
                            props.setarEstado('selecionar');
                            props.setarMinutos(0);
                            props.setarSegundos(1);
                            play();
                        }
                    }
                }
          },1000)

          return () => clearInterval(timer);
        }, )
        

        const resetar = () => {
            props.setarEstado('selecionar');
            props.setarMinutos(0);
            props.setarSegundos(1);
        }

        const formatarNumeros = (number) => {
            var finalNumber = '';
            if (number < 10) {
                finalNumber = '0' + number;
            }else{
                finalNumber = number;
            }
                return  finalNumber;

        }

        
        var segundos = formatarNumeros(props.segundos);
        var minutos = formatarNumeros(props.minutos);

        const play = async () => {
            const sound = new Audio.Sound();
            try {
            var alarme;
            props.alarmes.map((val) =>{
                if (val.selecionado) {
                    alarme = val.file; 
                }
            })
            await sound.loadAsync(alarme);
            await sound.playAsync();
            // Your sound is playing!

            // Don't forget to unload the sound from memory
            // when you are done using the Sound object

            } catch (error) {
             console.log(error);
            }
        }

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0, 84, 163,0.4)', 'rgba(0, 84, 163,0.9)']}
        style={styles.background}
      />

      <View style={styles.content}>
      <Text style={styles.Text}>{minutos} : </Text>
      <Text style={styles.Text}>{segundos}</Text>

      </View>

      <TouchableOpacity
                          onPress={() =>resetar() }
                          style={styles.btnEscolherSelecionado}
                         >
                           <Text
                          style={styles.btnEscolherText}
                 
                           > 
                           Resetar
                           </Text>
                 
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  Text: {
    color: 'white',
    fontSize: 40,

  },
  content: {
    flexDirection: 'row',
  },

  btnEscolherSelecionado: {
    padding: 10,
    backgroundColor: 'rgb(209, 42, 27)',
    borderRadius: 20,
    marginTop:20,
    width: 200,
  },

  btnEscolherText: {
    color: 'white',
    textAlign: 'center',

  },
});
