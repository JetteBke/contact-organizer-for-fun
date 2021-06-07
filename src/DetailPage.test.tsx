import {render} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import {DetailPage} from "./DetailPage";
import {mocked} from "ts-jest/utils";
import {getContact} from "./Contacts/ContactService";
import {useParams} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {saveNote} from "./Notes/NoteService";

jest.mock('./Contacts/ContactService')
jest.mock('./Notes/NoteService')

describe('DetailPage', () => {
    const contactId = 2
    const contact = {
        address: "some street 12",
        city: "cologne",
        emailOne: "ghjk@ghjk.com",
        emailTwo: "tyuio@78ijnm.com",
        firstName: "Detlef",
        lastName: "Doodle",
        phoneOne: 3456789,
        phoneTwo: 3456789,
        postalCode: 8765,
        title: "Don",
        id: contactId
    }

    beforeEach(() => {
        mocked(getContact).mockReturnValue(Promise.resolve(contact))
        mocked(saveNote).mockReturnValue(Promise.resolve())
        mocked(useParams).mockReturnValue({contactId: contactId.toString()})
    })

    it('should pass contact id as prop to detail contact view',  async() => {
        const wrapper = render(<DetailPage/>)
        await act(() => Promise.resolve())

        expect(wrapper.getByText('some street 12')).toBeInTheDocument()
    })

    it('should save a note and send it to the service on submit', async() => {
        const wrapper = render(<DetailPage/>)
        await act(() => Promise.resolve())

        userEvent.click(wrapper.getByRole('button'))

        expect(saveNote).toHaveBeenCalledWith({})
    })
})