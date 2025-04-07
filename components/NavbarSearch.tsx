import { Input } from '../components/ui/input'
import {
  Search,
} from "lucide-react"
import Form from 'next/form'
export default function NavbarSearch() {
    
  return (
    <Form action="/search " className='relative flex gap-5 items-center justify-between h-20 px-25'>
    {/* On submission, the input value will be appended to the URL, e.g. /search?query=abc */}
    <Search className="absolute right-135 top-10 h-4 w-4 text-muted-foreground -translate-y-1/2" />
    <Input name="query" className='w-100 pl-10' type="search" placeholder="Search for product" />
    <button type="submit">Submit</button>
  </Form>
  )
}