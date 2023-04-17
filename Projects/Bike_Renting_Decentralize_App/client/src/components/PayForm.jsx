import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  Text,
  Flex,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { BlockchainContext } from '../context/BlockchainProvider'
import { useContext } from 'react'

export default function PayForm() {
  const{makePayment}=useContext(BlockchainContext)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit=async(values)=>{
  console.log(JSON.stringify(values,null,2))
  const {payment}=values;
  await makePayment(payment)
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} p={5} mt={10}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Text
        fontFamily={"heading"}
        fontSize={"x-large"}
        fontWeight={600}
        mb={4}
        >
Pay your Due
        </Text>
      <FormControl isInvalid={errors.payment}>
        
        <Input
          id='payment'
          type="number"
          step="any"
          placeholder='Payment'
          {...register('payment', {
            required: 'This is required',
            
          })}
        />
        <FormErrorMessage>
          {errors.payment && errors.payment.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </Flex>
  )
}