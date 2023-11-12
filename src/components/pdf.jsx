'use client'

import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from '../components/Button'
import { useUser } from '@/context/Context.js'


Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '1cm',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 5px 1px rgb(175, 175, 175)',
    },
    image: {
        boxSizing: 'border-box',
        position: 'relative',
        objectFit: 'cover'
    },

})

const PDFView = () => {
    const { user, userDB, setUserData, setUserSuccess, transactionDB, transferencia, fecha, setFecha, QRurl} = useUser()

    const [isCliente, setisCliente] = useState(false);

    useEffect(() => {
        setisCliente(true)
    });

    return (
        <div className="w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document>
                    <Page size='A4' style={styles.body} >
                     

                        <View style={{ display: 'flex', width: '100%', flexDirection: 'row', paddingTop: '50px' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: '12px', alignText: 'center' }}>REPORTE</Text>
                                <View style={{ paddingTop: '12px', width: '200px', display: 'flex',  flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Remitente:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>{userDB && userDB.profile && userDB.profile.nombre}</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>transactionDB</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>{transactionDB.nombre && transactionDB.nombre}</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Cuenta transactionDB:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>{transactionDB.tarjeta && transactionDB.tarjeta}</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Divisa:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>BOB</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Importe:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>{transferencia}</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Fecha:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>{fecha}</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%' }}>Estado:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>En proceso</Text>
                                </View>
                                <View style={{ paddingTop: '12px',  display: 'flex',  flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Operacion:</Text>
                                    <Text style={{ fontSize: '12px', width: '50%'  }}>Envio</Text>
                                </View>
                                <View style={{height: '50px'}}></View>


                            </View>
                            <Image src={QRurl} style={{ height: '150px', width: '150px' }}></Image>

                        </View>
                    </Page>
                </Document>
            }
                fileName='Reporte'>

                {({ blob, url, loading, error }) =>
                    <Button theme={'Primary'}> {'Descargar PDF'}</Button>
                }
            </PDFDownloadLink>}
        </div>
    )
}

export default PDFView