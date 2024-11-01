import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, TextInput,} from "react-native";
import CheckBox from 'expo-checkbox';
import { useUsuariosDatabase } from "../database/useUsuariosDatabase";

export default function Cadastro(){
    const usuariosControle = useUsuariosDatabase()
//    const [usuarios, setUsuarios] = useState('')

    //const [id, setId] = useState(0)
    const [nome, setNome] = useState('')
    const [email, setEmail ] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [telefone, setTelefone] = useState('')

    const [step, setStep] =useState(1);

    const [selectedPlan, setSelectedPlan] = useState('')

    const verificarSenha = () => {
      let isSenhaValida = false;
      if(senha === confirmarSenha){
          //alert('Senhas iguais')
          isSenhaValida = true;
      }
        else{
          Alert.alert('Erro', 'As senhas não conferem')
          isSenhaValida = false
        }
      return isSenhaValida
    }

    const avancar1 = () => {
        if (verificarSenha()){
          return setStep(2)
        }else{
          return setStep(1)
        }
       
    }

    async function criarUsuario(){
        try{
           await usuariosControle.inserir(nome,email,senha,cep,endereco,numero,complemento,telefone,selectedPlan)
//Alert.alert("Usuario criado com sucesso!")
              
            }catch(error){
            console.log(error)
        }
    }

    const cadastrar = () => {
        try{
          if(nome === '' || email === '' || senha === '' || confirmarSenha === '' ||
            cep === '' || endereco === '' || numero === '' || telefone === ''){
              
              Alert.alert('Erro', 'Preencha todos os campos')
              return;
          }
          
          criarUsuario()
          Alert.alert("Sucesso!","Novo usuario cadastrado com sucesso!")
        
      }catch(error){
          console.log(error)
          alert('Usuario nao cadastrado, verifique o console para solucionar')
        
      }
    
    }


    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Insira alguns dados básicos:</Text>

            {step === 1 && (
                <View style={styles.containerCadastrar}>
                     <Text style={styles.add}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              onChangeText={text => setNome(text)}
            />
            
            <Text style={styles.add}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira seu endereço de email"
                    keyboardType="email-address"
                    onChangeText={text => setEmail(text)}
            />

            <Text style={styles.add}>Crie uma Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insira sua senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />
            <Text style={styles.add}>Repita a Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Repita sua senha"
                    secureTextEntry={true}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />
                    <TouchableOpacity style={styles.button} onPress={()=> avancar1()}>
                        <Text style={styles.buttonText}>Avançar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor:'red'}]} onPress={() => router.push("/")}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            )}
            
            {step === 2 && (
                <View style={styles.containerCadastrar}>
                      <Text style={styles.add}>CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu CEP"
        keyboardType="numeric"
        onChangeText={text => setCep(text)}
      />

      <Text style={styles.add}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu endereço"
        onChangeText={text => setEndereco(text)}
      />
      <Text style={styles.add}>Número</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu número"
        keyboardType="numeric"
        onChangeText={text => setNumero(text)}
      />
      <Text style={styles.add}>Complemento</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira seu complemento"
        onChangeText={text => setComplemento(text)}
      />
      <Text style={styles.add}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        onChangeText={text => setTelefone(text)}
      />

                    <TouchableOpacity style={styles.button} onPress={() => setStep(3)}>
                        <Text style={styles.buttonText}>Avançar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => setStep(1)}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 3 && (
         <View style={styles.containerCadastrar}>
            <Text style={styles.title}>Para finalizar, qual seu plano de saúde?</Text>
         <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Sulamerica'}
          onValueChange={() => setSelectedPlan('Sulamerica')}
        />
        <Text >Sulamerica</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Unimed'}
          onValueChange={() => setSelectedPlan('Unimed')}
          
        />
        <Text>Unimed</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Bradesco'}
          onValueChange={() => setSelectedPlan('Bradesco')}
        />
        <Text>Bradesco</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Amil'}
          onValueChange={() => setSelectedPlan('Amil')}
        />
        <Text>Amil</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Biosaúde'}
          onValueChange={() => setSelectedPlan('Biosaúde')}
        />
        <Text>Biosaúde</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Biovida'}
          onValueChange={() => setSelectedPlan('Biovida')}
        />
        <Text >Biovida</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Outros'}
          onValueChange={() => setSelectedPlan('Outros')}
        />
        <Text >Outros</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedPlan === 'Nenhum'}
          onValueChange={() => setSelectedPlan('Nenhum')}
        />
        <Text >Não tenho plano</Text>
      </View>

                    <TouchableOpacity style={styles.button} onPress={() => cadastrar()}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => setStep(2)}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            )}


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    containerCadastrar: {
        flex: 1,
        width: '100%',
        padding: 20,
    
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#0B3B60',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 15,
        marginTop: 15
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
      },
      add: {
        margin: 2,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        color:'#0B3B60',
      },

      checkboxContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        //alignItems: 'left',
        borderRadius: 10,
        margin: 1,
      },
})