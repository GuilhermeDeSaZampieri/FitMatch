import React, { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./style";




interface ButtonRootProps extends TouchableOpacityProps{
    children: React.ReactElement<ButtonlabelProps> | React.ReactElement<ButtonlabelProps>
    type?: 'default'|'outline'|'ghost';
}

function ButtonRoot({children,style,type = 'default', ...props}:ButtonRootProps){
    
    const typeStyles = {
        default: styles.default,
        outline: styles.outline,
        ghost: styles.ghost,
    }
    return (
        <TouchableOpacity
        {...props}
        style={[typeStyles[type],
        style]}>
            {
                React.Children.map(children, (child) =>{
                    if(React.isValidElement(child)){
                        return React.cloneElement(child, {type})
                    }
                })
            }
        </TouchableOpacity>
    );
}


interface ButtonlabelProps extends TouchableOpacityProps{
    children: ReactNode;
    type?: 'default'|'outline'|'ghost';
}

function Buttonlabel({children,style,type = 'default', ...props}:ButtonlabelProps){
    
    const typeStyles = {
        default: styles.defaultLabel,
        outline: styles.outlineLabel,
        ghost: styles.ghostLabel,
    }

    return (
        <Text
        style={[styles.label, typeStyles[type]]}>
            {children}
        </Text>
    );
}

export const Button ={
    Root: ButtonRoot,
    Label: Buttonlabel
}

