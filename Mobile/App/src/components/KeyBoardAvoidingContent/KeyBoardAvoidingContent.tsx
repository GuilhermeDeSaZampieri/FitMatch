import {ReactNode, useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { styles } from './style';


interface KeyboardAvoidingContentProps {
  children: ReactNode;
}

export default function KeyboardAvoidingContent({children,}: KeyboardAvoidingContentProps) {
    const [keyboardOffSet, setKeyboardOffSet] = useState(0);
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{
            setKeyboardOffSet(Platform.OS === 'ios' ? 0 : 30);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>{
            setKeyboardOffSet(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])

    
    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={keyboardOffSet}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
        );
    }
