import React from 'react'
import {Sword} from "lucide-react";
import {Link} from 'react-router';

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
        <div className="bg-primary/10 rounded-full p-8">
            <Sword className="size-10 text-primary"/>
        </div>
        <h3 className="text-2xl font-bold">No quests yet</h3>
        <p className="text-base-content/70">
            Ready to start your adventure? Create your first quest to begin your journey and earn XP!
        </p>
        <Link to="/create" className="btn btn-primary">
            <Sword className="size-5" />
            Create Your First Quest
        </Link>
    </div>
  )
}

export default NotesNotFound
