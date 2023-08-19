import { useContext, useState } from 'react'
import {Modal, Button} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useMutation } from 'react-query';
import UserDetailcontext from '../../context/UserDetailContext.js'
import { bookVisit } from '../../utils/api.js';

const BookingModal = ({opened, setOpened, email, propertyId}) => {

    const [value, setValue] = useState(null);
    const { 
        userDetails: {token} 
    } = useContext(UserDetailcontext);

    console.log(token)

    const {mutate, isLoading} = useMutation({
        mutationFn: ()=> bookVisit(value, propertyId, email, token)
    })

  return (
    <Modal
        opened={opened}
        onClose={()=>setOpened(false)}
        title="Select your date of visit"
        centered
    >
        <div className='flexColCenter'>
            <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
            <Button disabled={!value} onClick={() => mutate()}>
                Book Visit
            </Button>
        </div>
    </Modal>
  )
}

export default BookingModal