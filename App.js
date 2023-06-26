import React, {useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
        const [segundos, setarSegundos] = useState(0);
        const [minutos, setarMinutos] = useState(0);
        const [estado, setarEstado] = useState('selecionar');
        const [alarme, setarAlarme] = useState([
          {
            id: 1,
            selecionado: true,
            som: 'alarme 1',
            file: '',
          },

          {
            id: 2,
            selecionado: false,
            som: 'alarme 2',
            file: '',
          }
        ]);
        const [selectedLanguage, setSelectedLanguage] = useState();

        const pickerRef = useRef();

        function open() {
          pickerRef.current.focus();
        }

        function close() {
          pickerRef.current.blur();
        }

        var numeros = [];
        for (var i = 1; i < 60; i++) {
          numeros.push(i);
          
        }

        const setarAlarmeSound = (id) => {
            let alarmesTemp = alarme.map((val) => {
                      if (id != val.id) 
                        val.selecionado = false;
                        
                      else
                        val.selecionado = true;
                        return val;

                      
            })
                setarAlarme(alarmesTemp);
        }

          if (estado == 'selecionar') {
            return(
                <View style={styles.container}>
                  <StatusBar hidden />
            
                  <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0, 84, 163,0.4)', 'rgba(0, 84, 163,0.9)']}
                    style={styles.background}
                  />
            
                  <Text
                  style={styles.Text}
                  >
                  Selecione o seu tempo:
                  </Text>
            
                  <View
                   style={{flexDirection: 'row'}} 
                  >
            
                   <Text
                   style={{...styles.Text, 
                              fontSize: 15,
                           }}
                   >Min:
                   </Text> 
            
                  <Picker
                    selectedValue={minutos}
                    onValueChange={(itemValue, itemIndex) =>
                      setarMinutos(itemValue)
                    }
                    style={styles.picker}
                    >
                        <Picker.Item label='0' value='0' />
            
                    {
                      numeros.map((val) => {
                        return(
                        <Picker.Item
                         key={i}
                         label={val.toString()}
                         value={val.toString()}
                         />
                        )
                      })
                    }
                  </Picker>
            
                   <Text
                    style={{...styles.Text, 
                      fontSize: 15, 
                    }}
                   >
                    Seg:
                    </Text> 
            
                  <Picker
                   selectedValue={segundos}
                   onValueChange={(itemValue, itemIndex) =>
                     setarSegundos(itemValue)
                   }
                    style={styles.picker}
                    >
                   {
                      numeros.map((val) => {
                        return(
                        <Picker.Item
                         key={i}
                         label={val.toString()}
                         value={val.toString()}
                         />
                        )
                      })
                    }
                  </Picker>
                  </View>
            
                  <View
                  style={{flexDirection: 'row'}}
                  >
                   {
                    alarme.map((val) => {
                      if (val.selecionado) {
                        return(
                          <TouchableOpacity
                          onPress={() => setarAlarmeSound(val.id)}
                          key={val.som}
                          style={styles.btnEscolherSelecionado}
                         >
                           <Text
                          style={styles.btnEscolherText}
                 
                           > 
                           {val.som}
                           </Text>
                 
                         </TouchableOpacity>
                        )  
                      }else{
                        return(
                          <TouchableOpacity
                          onPress={() => setarAlarmeSound(val.id)}
                          key={val.som}
                          style={styles.btnEscolher}
                         >
                           <Text
                          style={styles.btnEscolherText}
                 
                           > 
                           {val.som}
                           </Text>
                 
                         </TouchableOpacity>
                        )
                      }
                      
                    })
                   }
                  </View>

                  <TouchableOpacity
                  style={styles.btnIniciar}
                  onPress={() => setarEstado('iniciar')}
                  >
                    <Text
                    style={styles.btnIniciarText}
                    >
                      Iniciar
                    </Text>

                  </TouchableOpacity>
                </View>
              );
            
          } else if(estado == 'iniciar'){
                return(
                  <View>
                    <Text>Começou</Text>
                  </View>
                )
          }
}

const styles = StyleSheet.create({

  btnIniciar: {
      backgroundColor: '#0f35a6',
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 30,
      borderColor: 'white',
      borderWidth: 2,
  
  },

  btnIniciarText: {
       position: 'relative',
       padding: 30,
       color: 'white',
       fontSize: 20,
       width: 119,
       right: 10,
       
  },
  
  container: {
    flex: 1,
    //backgroundColor: '#349eeb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Text: {
    color: 'white',
    fontSize: 30,
    paddingTop: 16,
  },

  picker: {
    height: 50,
    width: 100,
    color: 'white',
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  btnEscolher: {
    padding: 8,
    backgroundColor: '#1b79d1',
    borderRadius: 20,
    marginRight: 10,
  },

  btnEscolherText: {
    color: 'white',
  },

  btnEscolherSelecionado: {
    padding: 8,
    backgroundColor: 'rgba(209, 42, 27, 0.8)',
    borderRadius: 20,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 1,
  },

});
